import EventEmitter from "./EventEmitter";
import Experience from "../Experience";
export default class Connection extends EventEmitter {
  constructor() {
    super();
    // console.log("Connection initialized");
    this.room = "my-room2";
    this.host = "wss://partykitproject.zax-pfe.partykit.dev";
    this.setInstance();
    this.setupEventHandlers();
    this.receivedMessages = [];

    this.experience = new Experience();
    this.mobileData = this.experience.mobileData;
  }

  // setUpWebSocket() {
  //   this.socket = new WebSocket(`${this.host}/parties/main/${this.room}`);
  //   this.setupEventHandlers();
  // }

  parseMessage(eventData) {
    const raw = eventData;

    // on doit clean le message
    // exemple de message reçu : a4beb48d-e664-4ba0-9b76-0ba97072cd04: {...}
    // on retire l'id du client donné par PartyKit
    const parts = raw.split(": ");

    if (parts.length <= 1) {
      // probablement juste du texte normal
      return raw;
    }

    const jsonString = parts.slice(1).join(": "); // retire l'ID + ": "

    try {
      return JSON.parse(jsonString);
    } catch {
      return raw;
    }
  }

  setInstance() {
    this.instance = new WebSocket(`${this.host}/parties/main/${this.room}`);
  }

  setupEventHandlers() {
    this.instance.onopen = () => {
      // console.log("Connected to PartyKit server");
      // this.instance.send("hello from vanilla TS client");
      this.trigger("connected");
      this.sendMessage("title");
    };

    this.instance.onmessage = (event) => {
      const msg = this.parseMessage(event.data);
      // console.log("Received:", msg);

      // envoi des données du mobile à mobiledata.js
      this.mobileData.processMobileMessage(msg);

      this.trigger("message", event.data);
      this.receivedMessages.push(event.data);
    };

    this.instance.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.trigger("error", error);
    };

    this.instance.onclose = () => {
      console.log("Connection closed");
      this.trigger("disconnected");
    };
  }

  sendMessage(message) {
    if (this.instance && this.instance.readyState === WebSocket.OPEN) {
      this.instance.send(message);
    } else {
      console.warn("WebSocket not ready, message not sent:", message);
    }
  }
}

import EventEmitter from "./EventEmitter";

export default class Connection extends EventEmitter {
  constructor() {
    super();
    console.log("Connection initialized");
    this.room = "my-room";
    this.host = "wss://partykitproject.zax-pfe.partykit.dev";
    this.setInstance();
    this.setupEventHandlers();
    this.receivedMessages = [];
  }

  // setUpWebSocket() {
  //   this.socket = new WebSocket(`${this.host}/parties/main/${this.room}`);
  //   this.setupEventHandlers();
  // }

  setInstance() {
    this.instance = new WebSocket(`${this.host}/parties/main/${this.room}`);
  }
  setupEventHandlers() {
    this.instance.onopen = () => {
      console.log("Connected to PartyKit server");
      this.instance.send("hello from vanilla TS client");
      this.trigger("connected");
    };

    this.instance.onmessage = (event) => {
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
}

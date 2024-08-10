class MockAmqpConnection {
  private _connected: boolean = true;
  get connected(): boolean {
    return true;
  }
  async connect(): Promise<void> {
    this._connected = true;
  }
  async disconnect(): Promise<void> {
    this._connected = false;
  }
}

export { MockAmqpConnection };

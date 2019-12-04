export class StopWatch {
  startTime: Date | null;
  stopTime: Date | null;
  isRunning: boolean;  

  constructor(){
    this.isRunning = false;
    this.startTime = null;
    this.stopTime = null;    
  }

  get runningMs(): number{
    return this.isRunning 
      ? (new Date() as any as number) - (this.startTime as any as number)
      : (this.stopTime as any as number) - (this.startTime as any as number);
  }

  start(): StopWatch{
    this.startTime = new Date();
    this.isRunning = true; 
    return this;
  }
  

  stop(): StopWatch{
    this.isRunning = false;
    this.stopTime = new Date();
    return this;
  }

  reset(): StopWatch{
    this.startTime = null;
    this.stopTime = null;
    this.isRunning = false;
    return this;
  }
}
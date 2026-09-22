export interface Job {
  readonly name: string;
  readonly schedule: string;  
  handle(): Promise<void>;
}
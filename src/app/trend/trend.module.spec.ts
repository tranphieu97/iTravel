import { TrendModule } from './trend.module';

describe('TrendModule', () => {
  let trendModule: TrendModule;

  beforeEach(() => {
    trendModule = new TrendModule();
  });

  it('should create an instance', () => {
    expect(trendModule).toBeTruthy();
  });
});

import { FormatDurationPipe } from './format-duration.pipe';

describe('FormatDurationPipe', () => {
  let pipe;
  
  beforeEach(() => {
    pipe = new FormatDurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format minutes'), () => {
    const minutes = 88;
    const expectedFormattedMinutes = '1h 28min';
    
    expect(pipe.transform(minutes)).toBe(expectedFormattedMinutes);
  }
});

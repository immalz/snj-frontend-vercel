import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitPipe implements PipeTransform {

  transform(value: string, args: string): string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
    // tslint:disable-next-line: prefer-const
    let limit = args ? parseInt(args, 10) : 10;
    // tslint:disable-next-line: prefer-const
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}

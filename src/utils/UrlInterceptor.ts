import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UrlInterceptor implements NestInterceptor {
  //   private readonly baseUrl: string = 'http://8.141.86.20:3000'; // 可配置为动态获取

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 如果响应数据是数组
        if (Array.isArray(data)) {
          return data.map((item) => this.addBaseUrlToUrls(item));
        }

        // 如果响应数据是对象
        return this.addBaseUrlToUrls(data);
      }),
    );
  }

  private addBaseUrlToUrls(data: any): any {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (key.includes('url_suffix')) {
          const newKey = key.replace('url_suffix', 'url');
          data[newKey] = global.host + value;
        }
      });
    }

    return data;
  }
}

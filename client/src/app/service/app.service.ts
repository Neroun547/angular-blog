import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
    export class AppService {
        constructor(private http: HttpClient, private sanitizer: DomSanitizer){}
        getImage(url: string): any {
            return this.http
              .get(url, { responseType: 'blob' })
              .pipe(
                map(x => {
                  const urlToBlob = window.URL.createObjectURL(x); // get a URL for the blob
                  return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
                }),
              );
        }
    }

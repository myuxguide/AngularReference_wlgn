import {Injectable} from '@angular/core';

/**
 * @return global native browser window
 */
function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRef {
  get nativeWindow(): Window {
    return WindowRef.nativeWindow;
  }

  static get nativeWindow(): Window {
    return _window();
  }

  static get document(): Document {
    return WindowRef.nativeWindow.document;
  }

  static scrollTo(x: number, y: number) {
    WindowRef.nativeWindow.scrollTo(x, y);
  }
}

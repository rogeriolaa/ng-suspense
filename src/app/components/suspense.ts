import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  signal,
  isSignal,
  effect,
  OnInit,
  OnDestroy,
  Signal,
  untracked,
  Injector,
  inject,
} from '@angular/core';
import { isObservable, Observable, Subscription } from 'rxjs';

type AsyncSource<T> = Observable<T> | Promise<T> | Signal<T> | T;

@Component({
  selector: 'app-suspense',
  template: `
    @defer (when loaded()) {
    <ng-container
      *ngTemplateOutlet="content; context: { $implicit: data() }"
    ></ng-container>
    } @placeholder { @if (showFallback()) {
    <ng-container *ngTemplateOutlet="fallback"></ng-container>
    } } @error {
    <ng-container
      *ngTemplateOutlet="errorTpl; context: { $implicit: error() }"
    ></ng-container>
    }
  `,
  imports: [CommonModule],
})
export class Suspense<T> implements OnInit, OnDestroy {
  @Input({ required: true }) source!: AsyncSource<T>;
  @Input({ required: true }) content!: TemplateRef<any>;
  @Input({ required: true }) fallback!: TemplateRef<any>;
  @Input({ required: true }) errorTpl!: TemplateRef<any>;

  data = signal<T | null>(null);
  error = signal<any>(null);
  loaded = signal(false);
  showFallback = signal(false);
  private injector = inject(Injector);
  private subscription: Subscription | null = null;
  private fallbackTimeout: any;

  ngOnInit() {
    // Set a timeout to show the fallback after a small delay (e.g., 300ms)
    // This prevents a "flash of spinner" on very fast data fetching.
    this.fallbackTimeout = setTimeout(() => {
      this.showFallback.set(true);
    }, 100);

    try {
      if (isObservable(this.source)) {
        this.subscription = this.source.subscribe({
          next: (v) => this.setData(v),
          error: (e) => this.setError(e),
        });
      } else if (this.source instanceof Promise) {
        this.source.then((v) => this.setData(v)).catch((e) => this.setError(e));
      } else if (isSignal(this.source)) {
        effect(
          () => {
            try {
              const value = (this.source as any)();
              untracked(() => this.setData(value));
            } catch (err) {
              untracked(() => this.setError(err));
            }
          },
          { injector: this.injector }
        );
      } else {
        this.setData(this.source as T);
      }
    } catch (err) {
      this.setError(err);
    }
  }

  ngOnDestroy() {
    // Clean up the subscription and timeout to prevent memory leaks.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    clearTimeout(this.fallbackTimeout);
  }

  private setData(value: T) {
    if (!value) return;
    this.data.set(value);
    this.loaded.set(true);
    // Clear the timeout if data arrives before the fallback is shown
    clearTimeout(this.fallbackTimeout);
  }

  private setError(err: any) {
    this.error.set(err);
    this.loaded.set(true);
    // Clear the timeout on error as well
    clearTimeout(this.fallbackTimeout);
  }
}

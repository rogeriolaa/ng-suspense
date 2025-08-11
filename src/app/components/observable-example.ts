import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Suspense } from './suspense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-observable-example',
  template: `
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Observable Example</h2>
    <p class="text-gray-600 mb-4">
      Fetches posts from an API using an **Observable** with a 2-second delay.
    </p>

    <app-suspense
      [source]="posts$"
      [content]="postsTpl"
      [fallback]="fallbackTpl"
      [errorTpl]="errorTpl"
    >
    </app-suspense>

    <ng-template #postsTpl let-posts>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (post of posts; track post.id) {
        <div class="bg-indigo-50 p-4 rounded-md shadow-sm">
          <h3 class="font-bold text-indigo-800">{{ post.title }}</h3>
          <p class="text-sm text-indigo-700 mt-1">
            {{ post.body | slice : 0 : 100 }}...
          </p>
        </div>
        }
      </div>
    </ng-template>
    <ng-template #fallbackTpl>
      <div class="text-center p-8 text-gray-500">
        <div
          class="animate-spin rounded-full h-8 w-8 border-2 border-indigo-400 border-r-transparent mx-auto mb-2"
        ></div>
        <p>Loading posts...</p>
      </div>
    </ng-template>
    <ng-template #errorTpl let-error>
      <div class="text-center p-8 bg-red-100 text-red-700 rounded-md">
        <p class="font-bold">Error!</p>
        <p>{{ error.message }}</p>
      </div>
    </ng-template>
  `,
  standalone: true,
  imports: [Suspense, CommonModule],
})
export class ObservableExample {
  api = inject(ApiService);
  posts$ = this.api.getPostsAsObservable();
}

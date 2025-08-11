# 🚀 ng-suspense: Universal Suspense Component for Angular 🚀

`ng-suspense` is a powerful and flexible Angular component that brings the "Suspense" pattern to your applications. It simplifies handling of asynchronous operations (Promises, Observables, and Signals) in your templates, allowing you to declaratively handle loading, success, and error states with ease.

This component leverages Angular's new `@defer` control flow to provide a clean and efficient way to manage async data, making your code more readable and maintainable.

## ✨ Features

- **Universal Support:** Works seamlessly with `Promises`, `Observables`, and `Signals`.
- **Declarative:** Write clean, declarative templates for your async logic.
- **Reusable:** A single component to handle all your async UI needs.
- **Lightweight:** Built on top of modern Angular features with minimal overhead.
- **Customizable:** Use your own components and templates for loading, success, and error states.

## 🚀 How to Use

Using `ng-suspense` is straightforward. Follow these steps:

**1. Import the `Suspense` Component**

First, make sure the `Suspense` component is standalone and import it into your component or module.

```typescript
import { Suspense } from "./path/to/suspense.component";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [Suspense],
  // ...
})
export class MyComponent {
  // ...
}
```

**2. Use it in Your Template**

In your component's template, use the `<app-suspense>` selector and pass your data source and templates.

```html
<app-suspense [source]="myData" [content]="dataTpl" [fallback]="loadingTpl" [errorTpl]="errorTpl"> </app-suspense>
```

- `[source]`: Your async data source (Promise, Observable, or Signal).
- `[content]`: An `<ng-template>` for the success state.
- `[fallback]`: An `<ng-template>` for the loading state.
- `[errorTpl]`: An `<ng-template>` for the error state.

**3. Define Your Templates**

Create the `ng-template` elements to define the different states of your UI.

```html
<!-- Template for displaying the data -->
<ng-template #dataTpl let-posts>
  <div *ngFor="let post of posts">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</ng-template>

<!-- Template for the loading spinner -->
<ng-template #loadingTpl>
  <p>Loading...</p>
</ng-template>

<!-- Template for displaying errors -->
<ng-template #errorTpl let-error>
  <p>Error: {{ error.message }}</p>
</ng-template>
```

**4. Provide the Data Source**

In your component class, define the data source.

```typescript
import { Component, inject } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
  // ...
})
export class MyComponent {
  api = inject(ApiService);
  myData = this.api.getPostsAsPromise(); // Can be a Promise, Observable, or Signal
}
```

## 📦 Running the Demo

To see `ng-suspense` in action, you can run the included demo application.

**1. Install Dependencies**

```bash
pnpm install
```

**2. Run the Development Server**

```bash
pnpm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

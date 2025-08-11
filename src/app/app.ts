import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ObservableExample } from './components/observable-example';
import { PromiseExample } from './components/promise-example';
import { SignalExample } from './components/signal.example';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-gray-100 min-h-screen p-8 font-sans">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">
          Universal Suspense Component Demo 🚀
        </h1>

        <div class="flex border-b border-gray-200 mb-6">
          <button
            (click)="selectedTab.set('observable')"
            [class]="getTabClasses('observable')"
          >
            Observable
          </button>
          <button
            (click)="selectedTab.set('promise')"
            [class]="getTabClasses('promise')"
          >
            Promise
          </button>
          <button
            (click)="selectedTab.set('signal')"
            [class]="getTabClasses('signal')"
          >
            Signal
          </button>
        </div>

        <div class="mt-4 p-4 border rounded-md border-gray-200 bg-gray-50">
          @switch (selectedTab()) { @case ('observable') {
          <app-observable-example />
          } @case ('promise') {
          <app-promise-example />
          } @case ('signal') {
          <app-signal-example />
          } }
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule, // Required for @switch
    ObservableExample,
    PromiseExample,
    SignalExample,
  ],
})
export class App {
  selectedTab = signal<'observable' | 'promise' | 'signal'>('observable');

  getTabClasses(tab: string): string {
    const baseClasses = 'px-4 py-2 text-sm font-medium focus:outline-none';
    const activeClasses = 'border-b-2 border-indigo-600 text-indigo-600';
    const inactiveClasses = 'text-gray-500 hover:text-gray-700';

    return `${baseClasses} ${
      this.selectedTab() === tab ? activeClasses : inactiveClasses
    }`;
  }
}

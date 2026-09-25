import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-learning-list',
  imports: [],
  template: `
    <ul>
      @for (item of items(); track item.id) {
        <li role="alert" class="alert alert-info alert-soft my-4 w-full">
          <div class="flex flex-row gap-4 items-end ">
            <span class="text-xl font-bold">{{ item.name }}</span>
            <span>{{ item.description }}</span>
          </div>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class List {
  protected readonly items = signal([
    {
      id: '1',
      name: 'Containers',
      description: 'Containers, docker, podman, etc.',
    },
    {
      id: '2',
      name: 'NodeJS',
    },
    {
      id: '3',
      name: 'TypeScript',
      description: 'Programming language, compiles to JS',
    },
  ]);
}

<x-layout>
  <x-slot:heading>
      recipe Page
  </x-slot:heading>
  <div class="flex justify-between">
      <div>
          <h2 class="font-bold text-lg capitalize">{{ $recipe->name }}</h2>
          <p>{{ $recipe->description }}</p>
      </div>
      <x-button href='/recipes/{{ $recipe->id }}/edit' class="mt-3">Edit recipe</x-button>
  </div>
</x-layout>

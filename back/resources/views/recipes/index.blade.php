<x-layout>
    <x-slot:heading>
        recipes page

    </x-slot:heading>
    <div class="space-y-4">
        @foreach ($recipes as $recipe)
            <a href="/recipes/{{ $recipe['id'] }}" class="block px-4 py-6 border border-gray-200 rounded">
              <img src="{{ $recipe->image }}" alt="" class="w-20 h-20">
                <div>
                    <strong>{{ $recipe->name }}:</strong>
                </div>
                {{ $recipe->description }}
            </a>
        @endforeach
        <div>
          {{ $recipes->links() }}
      </div>
    </div>
</x-layout>

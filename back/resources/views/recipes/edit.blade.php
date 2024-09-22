<x-layout>
  <x-slot:heading>
      Edit recipe: {{ $recipe->name }}
  </x-slot:heading>

  <form method="POST" action="/recipes/{{ $recipe->id }}">
      @csrf
      @method('patch')
      <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                      <div class="mt-2">
                          <div
                              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input type="text" name="name" id="name"
                                  class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="ex: programmer" value="{{ $recipe->name }}" required>
                          </div>
                      </div>
                      @error('name')
                          <div class="text-red-500 mt-2 text-xs font-semibold">{{ $message }}</div>
                      @enderror
                  </div>

                  <div class="sm:col-span-4">
                      <label for="description" class="block text-sm font-medium leading-6 text-gray-900">description</label>
                      <div class="mt-2">
                          <div
                              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input type="text" name="description" id="description"
                                  class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="ex: 50,000" value="{{ $recipe->description }}" required>
                          </div>
                      </div>
                      @error('description')
                          <div class="text-red-500 mt-2 text-xs font-semibold">{{ $message }}</div>
                      @enderror
                  </div>

                  <div class="sm:col-span-4">
                      <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
                      <div class="mt-2">
                          <div
                              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input type="text" name="image" id="image"
                                  class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="ex: 50,000" value="{{ $recipe->image }}" required>
                          </div>
                      </div>
                      @error('image')
                          <div class="text-red-500 mt-2 text-xs font-semibold">{{ $message }}</div>
                      @enderror
                  </div>
              </div>

          </div>
      </div>

      <div class="mt-6 flex items-center justify-between gap-x-6">
          <div class="flex items-center">
              <button form="delete-form" class="text-red-500 text-sm font-bold">delete</button>
          </div>
          <div class="flex items-center gap-x-6">
              <a href="/recipes/{{ $recipe->id }}" class="text-sm font-semibold leading-6 text-gray-900">Cancel</a>
              <button type="submit"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Save
              </button>
          </div>
      </div>
  </form>

  <form id="delete-form" method="POST" action="/recipes/{{ $recipe->id }}">
      @csrf
      @method('DELETE')
  </form>

</x-layout>

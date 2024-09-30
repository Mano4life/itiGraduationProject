<form action="/checkout" method="post">
  {{-- @csrf --}}
  <input type="hidden" name="_token" value="{{ csrf_token() }}">
  <button type="submit">CHECKOUT</button>
</form>
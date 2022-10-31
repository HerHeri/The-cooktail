class SearchBar extends HTMLElement {
  connectecCallback() {
    this.render()
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render()
  }

  get value() {
    return this.querySelector('#searchElement').value;
  }

  render() {
    this.innerHTML = `
    <div class="bg-custom row justify-content-between rounded-3 m-0" id="search-bar">
      <div class="col-lg-6 d-flex align-items-center">
        <h5 class="mb-0">List Cocktail Drink</h5>
      </div>
      <div class="col-lg-4 mt-3 text-end">
        <div class="input-group mb-3">
          <input
            type="search"
            class="form-control"
            placeholder="Input Cooktail Name"
            aria-label="Input Cooktail Name"
            aria-describedby="button-addon2"
            id="searchElement"
          />
          <button
            class="btn btn-info"
            type="button"
            id="buttonSearch"
          >
            Search
          </button>
        </div>
      </div>
    </div>`;

    this.querySelector('#buttonSearch').addEventListener('click', this._clickEvent)
  }
}

customElements.define('search-bar', SearchBar)
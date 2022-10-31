class AppBar extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <img src="/assets/cocktail.png" alt="" width="40px" /> &emsp;
                <h2 class="fs-4">The Cocktail</h2>
            </a>

            </header>
        </div>
        `;

    }
}

customElements.define('app-bar', AppBar)
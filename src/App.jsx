class ProductList extends React.Component {

    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }


    componentDidMount() {
        document.forms.ProductAdd.price.value = '$';
        this.loadData();
    }

    async loadData() {
        const query = `query{
            productList{
                id Name Price Image Category
            }
        }`;

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const result = await response.json();
        this.setState({ products: result.data.productList })
    }

    async createProduct(newProduct) {
        const newProducts = this.state.products.slice();
        newProduct.id = this.state.products.length + 1;
        newProducts.push(newProduct);
        this.setState({ products: newProducts });
        const query = `mutation {
            productAdd(product:{
              Name: "${newProduct.Name}",
              Price: ${newProduct.Price},
              Image: "${newProduct.Image}",
              Category: ${newProduct.Category},
            }) {
              id
            }
          }`;
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        this.loadData();
    }

    render() {
        return (
            <div>
                <h1>My Company Inventory</h1>
                <div>Showing all available products</div>
                <hr /><br />
                <ProductTable products={this.state.products} />
                <br />
                <div>Add a new product to inventory</div>
                <hr /><br />
                <ProductAdd createProduct={this.createProduct} />
            </div>
        );
    }
}

function ProductTable(props) {
    const productRows = props.products.map(product => <ProductRow key={product.id} product={product} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {productRows}
            </tbody>
        </table>
    );
}

const ProductRow = (props) => (
    <tr>
        <td>{props.product.Name}</td>
        <td>${props.product.Price}</td>
        <td>{props.product.Category}</td>
        <td><a href={props.product.Image} target="blank">View</a></td>
    </tr>
)


class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.ProductAdd;
        this.props.createProduct({
            Name: form.product.value,
            Price: form.price.value.slice(1),
            Category: form.category.value,
            Image: form.image.value,
        });
        // clearing the form for next inout
        form.price.value = "$";
        form.product.value = "";
        form.image.value = "";
    }

    render() {
        return (
            <div>
                <form name="ProductAdd" onSubmit={this.handleSubmit}>
                    <div>
                        <label >Category </label>
                        <select name="category">
                            <option value="shirt">Shirts</option>
                            <option value="jeans">Jeans</option>
                            <option value="jacket">Jackets</option>
                            <option value="sweater">Sweaters</option>
                            <option value="accessories">Accessories</option>
                        </select><br />
                        <label>Price Per Unit </label>
                        <input type="text" name="price" /><br />
                    </div>
                    <div>
                        <label>Product</label>
                        <input type="text" name="product" /><br />
                        <label>image </label>
                        <input type="text" name="image" /><br />
                    </div>
                    <button>Add Product</button>
                </form>
            </div>

        );
    }
}

var contentnode = document.getElementById('contents');
ReactDOM.render(<ProductList />, contentnode);
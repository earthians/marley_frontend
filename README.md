### Marley Frontend

Frontend for Marley Healthcare

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/earthians/marley_frontend.git
```

install ERP Next and Marley Healthcare to the site. Then,

```bash
bench --site demo.com install-app marley_frontend
```
```bash
bench setup requirements
bench build
bench --site demo.com migrate
```

### Frontend UI
The healthcare frontend pages will available on `demo.com/healthcare`.
Also pages will be listed on workspace `demo.com/app/marley-frontend`

#### For Frontend Development

1. Open a new terminal session and cd into frappe-bench/apps/marley_frontend, and run the following commands:

    ```bash
    yarn install
    yarn dev
    ```
2. Now, you can access the site on vite dev server at http://localhost:8080

### License

mit

# Api Tienda Online

## Productos

### Recuperación de todos los productos

- GET /api/products

- Recibo status 200
- La respuesta viene en formato JSON
- Recibamos un array de productos

### Creación de productos

- POST /api/products
- Body; name, description, price, department, available, stock.
- La resppuesta debe ser el nuevo producto creado(tiene _id, createdAt. updatedAt...).

- URL funciona:
    - Reciba un status 200.
    - El contenido de la respuesta sea un JSON.
- Comprobar si tiene el ID.
- Comprobar si los datos insertados coinciden con los que enviamos en el BODY.

### Edición de productos

- PUT /api/products/PRODUCTID
- Body: Los campos a modificar
- La respuesta debe ser el objeto editado

- URL funsiona
- Si los datos que envio para modificar realmente se modifican

1. Crear la URL en products.js
    - ¡¡Cuidado con como le pasamos el productoId!!
2. Recuperamos el id del producto a editar (req.params)
3. Ejecuutamos la edición a través del modelo de product (findByIdAnndUpdate)
4. El objeto que nos devuelva el método lo retornamos como JSON
5. ¿Funcinan las pruebas? SI / NO

### Borrado de productos

- DELETE /api/products/PRODUCTOID
- La respuesta debe ser el producto borrado

- Que la URL funcione
- Comprobar que el producto se ha borrado

### Productos por categoria

- GET /api/products/departamento
- find( RECIBE UN OBJ Clave: valor CON LA CONDICIÓN )
## Productos por rango de precio

- GET /api/products/price/10/max/100
- SELECT * FROM products WHERE price > 10 AND price < 100


- Buscar librerías de validación

- Joi
- VineJS
- Zod
- Yup

## Implementación del TOKEN

- Instalar las librerías necesarias
- Implementar la función **createToken**
- En el login, aparte del message, retornar también el token

- Implementar el middleware checkToken
- Estamos trabajando sobre MongoDB, ¿qué tengo que modificar?

## Carrito de la compra

- PUT /api/products/add_cart
- Body: { product_id }

- Crear la URL
- Dentro hacer un console.log para ver, el ID del producto y el ID del usuario uqe lo compra

## Recuperación del perfil de usuario

- GET /api/users/profile
- Responde en un JSON con todos los datos del usuario

## Middleware ...

## Productos activos

- GET /api/products/actives
- Recuperar todos los productos cuya propiedad available sea true y además tenga más de 10 unidades en stock

- GET /api/usuarios/USERID
- Recuperar el usuario a partir de su ID mostrando además todos los productos del casrrito.
# Shop backend

Изображения

- app.get('/getallimages') - получить все изображения, принимает значения ?value=10&offset=10 (value - количестве товаров в выдаче, по умолчанию 0; offset - отступ в выдаче товаров, по умолчанию 0)
- app.get('/image/:imageID') - получить рендер конкретного изображения
- app.post('/image') - отправить изображение (поле 'image' с файлом, поле 'productId' с Id товара, к которому привязать фотографию)
- app.delete('/image/:imageID') - удалить сообщение по ID

Товары

- app.get('/getallproducts') - получить все товары
- app.get('./product/:id') - получить товар по ID
- app.post('/product') - добавить товар (поля 'title', 'category', 'description' и 'price')  )
- app.delete('/product/:id') - удалить товар по ID
- app.get('/getcount') - количество товаров в категории

Корзина

- app.get('/cart') - просмотреть корзину
- app.post('/cart/:id') - добавить один товар в корзину по ID
- app.put('/cart/:id') - удалить один товар из корзины по ID
- app.delete('/cart/:id') - удалить всё количество товара из корзины по ID
- app.delete('/cart') - очистить корзину полностью

Заказы

- app.post('/order') - создать заказ (поля 'name', 'email')
- app.get('/order') - получить все заказы
- app.get('/order/:id') - получить заказ по ID
- app.delete('/order/:id') - удалить заказ по ID

##### New routes
- app.post('/search') - простой поиск по названию (поле 'str')
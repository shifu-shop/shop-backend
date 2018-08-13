# Shop backend
##### New Routes
Изображения
- app.get('/getallimages') - получить все изображения
- app.get('/image/:imageID') - получить рендер конкретного изображения
- app.post('/image') - отправить изображение (поле 'image' с файлом, поле 'productId' с Id товара, к которому привязать фотографию)
- app.delete('/image/:imageID') - удалить сообщение по ID

Товары
- app.get('/getallproducts') - получить все товары
- app.get('./product/:id') - получить товар по ID
- app.post('/product') - добавить товар (поля 'title', 'category', 'description' и 'price')  )
- app.delete('/product/:id') - удалить товар по ID
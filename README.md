```javascript
// 模型定义
const model = createModel("posts", (t) => {
	t.string();
	t.belongsTo();
})

model.sync();


// 通过模型生成GraphQL Type
// 生成Input Object
// 插件定义
// 提供接口给Graphql
userLoginPlugins(hashedPasswordAbleModel) {
	hashedPassword = hashedPasswordAbleModel

	return function() {
		export mutation = ...
	}
}

useLoginPlugins();
useCrudPlugins(Post);
```

const templates = {
	shoping: Handlebars.compile(document.querySelector('#shoping-left-side').innerHTML),
	shopingTitle: Handlebars.compile(document.querySelector('#title').innerHTML),
 };

const opts = {
	optCategoriesMainList: '.shoping',
	optCategoriesListSideBar: '.category-list',
	optCategoriesListSideBarLink: '.category-list a',
};

function generateCategories(){
	const categories = document.querySelectorAll(opts.optCategoriesMainList);
	const wraper = document.querySelector(opts.optCategoriesListSideBar);
	const categoriesAll = {arrayCategories: []};
	for(let category of categories){
		const categorieName = category.getAttribute('category')
		categoriesAll.arrayCategories.push({
			category: categorieName
		});
	}
	console.log(categoriesAll.arrayCategories);
	wraper.innerHTML = templates.shoping(categoriesAll);
}

function clickCategoriesHandler(event){
	event.preventDefault();
	const categories = document.querySelectorAll('.active');
	for(let category of categories){
		category.classList.remove('active');
	}
	this.classList.add('active');
	const hrefCategory = this.getAttribute('href');
	const atribute = hrefCategory.replace('#', '');
	const equals = document.querySelectorAll('[category="' + atribute + '"]');
	console.log(equals);

	for(let equal of equals){
		equal.classList.add('active');
	}
}

function categoriesAddListener(){
	categories = document.querySelectorAll(opts.optCategoriesListSideBarLink);
	console.log('cat', categories);
	for(category of categories){
		category.addEventListener('click', clickCategoriesHandler);
	}
}

function generateTitle(){
	const categories = document.querySelectorAll(opts.optCategoriesMainList);
	for(let category of categories){
		const name = {a: category.getAttribute('category')};
		category.innerHTML = templates.shopingTitle(name);
	}
}

function buttonClickHandler(event){
	const category = document.querySelector('.input-list');
	const text = document.querySelector('.input-text');
	const categoryValue = category.value;
	const textValue = text.value;
	console.log('co mi zwraca kategoria', categoryValue);
	category.value = '';
	text.value = '';
	const matchCategory = document.querySelector('[category=' + categoryValue + ']');
	const listShoping = matchCategory.querySelector('ul');
	const linkHTML = '<li>' + textValue + '<a href="#" id="' + textValue +'"><i class="fa-solid fa-check"></i></a></li>';
	listShoping.insertAdjacentHTML('beforeend', linkHTML);
	addIconListener(textValue);
}

function buttonAddListener(){
	document.querySelector('button').addEventListener('click', buttonClickHandler);
}

function addIconListener(textValue){
	const icon = document.getElementById(textValue);
	icon.addEventListener('click', iconClickHandler)
}

function iconClickHandler(event){
	event.preventDefault();
	console.log('this', this);
	const listSelector = this
	console.log('listselector', listSelector);
	listSelector.innerHTML = '';
}


generateCategories();
categoriesAddListener();
generateTitle();
buttonAddListener();


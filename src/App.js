import './App.css';
import { Collection } from './collection';
import { useState, useEffect } from "react";

function App() {
	const [isLoading, setIsLoading] = useState(true)
	const [collection, setcollection] = useState([])
	const [filteres, setFilteres] = useState(0)
	const [value, setValue] = useState('')
	const [page, setPage] = useState(1)

	useEffect(() => {
		setIsLoading(true)
		const category = filteres ? `cetegory=${filteres}` : '';
		fetch(`https://6880dfedf1dcae717b63ce3a.mockapi.io/collections?page=${page}&limit=3&${category}`)
			.then(res => res.json())
			.then((json) => {
				setcollection(json)
			}).catch(err => {
				console.warn(err)
				alert('Ошибка')
			})
			.finally(() => setIsLoading(false))
	}, [filteres, page])

	const onChengeFilteres = (indx) => {
		setFilteres(indx)
	}

	const filter = ['Все', 'Природа', 'Горы', 'Города', 'Путешествия по миру']

	return (
		<div className="App">
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{filter.map((e, indx) => <li key={indx} onClick={() => onChengeFilteres(indx)} className={filteres === indx ? 'active' : ''}>{e}</li>)}
				</ul>
				<input value={value} onChange={(e) => setValue(e.target.value)} className='searrch-input' placeholder='ввиедите текст'></input>
			</div>
			<div className='content'>
				{isLoading ? <h2>Идет загрузка ....</h2> :
					collection.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()))
						.map((obj, index) => (
							<Collection
								name={obj.name}
								images={obj.photos}
								key={index}
							/>
						))
				}


			</div>
			<ul className='pagination'>
				{
					[...Array(5)].map((_, i) => <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>)
				}
			</ul>
		</div>
	);
}

export default App;

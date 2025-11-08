interface CollectionProps  {
	images: string[];
	name: string;
}

export const Collection = ({ images, name }: CollectionProps ) => {
	return (
		<div className="collection">
			<img className="collection__big" alt="item" src={images[0]}></img>
			<div className="collection__bottom">
				{images.slice(1, 4).map((img, idx) => (
					<img key={idx} className="collection__mini" alt="item" src={img} />
				))}
			</div>

			<h4>{name}</h4>
		</div>
	)
}
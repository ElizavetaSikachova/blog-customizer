import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm articleState={articleState} onApply={handleApply} />
			<Article />
		</main>
	);
};

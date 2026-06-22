import { CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const containerRef = useRef<HTMLElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	// Синхронизируем formState с articleState при его изменении
	useEffect(() => {
		setFormState(articleState);
	}, [articleState]);

	// Управляем обработчиком клика по оверлею
	useEffect(() => {
		const handleOverlayClick = () => {
			setIsOpen(false);
		};

		if (isOpen && overlayRef.current) {
			overlayRef.current.addEventListener('click', handleOverlayClick);
			return () => {
				overlayRef.current?.removeEventListener('click', handleOverlayClick);
			};
		}
	}, [isOpen]);

	const handleArrowButtonClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />
			{isOpen && <div className={styles.overlay} ref={overlayRef} />}
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={containerRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: selected,
							}))
						}
					/>
					<Separator />
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: selected,
							}))
						}
					/>
					<Separator />
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selected,
							}))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selected,
							}))
						}
					/>
					<Separator />
					<RadioGroup
						title='Ширина контента'
						name='contentWidth'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selected,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

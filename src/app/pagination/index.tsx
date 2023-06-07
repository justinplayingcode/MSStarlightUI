import "./index.scss"

import React from "react";
import "./index.scss";
import { Icon } from "@fluentui/react";

interface PagingProps {
	pageTotal: number;
	postPerPage: number;
	callback: any;
  disable?: boolean;
}
interface PagingState {
	currentPage: number;
	arrPageNumbers: any[];
}

export default class Pagination extends React.Component<PagingProps, PagingState> {
	constructor(props: PagingProps) {
		super(props);
		this.state = {
			currentPage: 1,
			arrPageNumbers: [],
		};
	}

	handleCurrentPage = (value: number) => {
		this.setState({
			currentPage: value,
		});
		this.props.callback(value);
	};
	handleNextPage = (value: number) => {
		if (this.state.currentPage >= this.state.arrPageNumbers.length + 1) {
			this.setState({
				currentPage: this.state.currentPage + 1,
			});
		}
		this.props.callback(value);
	};
	handlePrevPage = (value: number) => {
		if (this.state.currentPage >= this.state.arrPageNumbers.length - 1) {
			this.setState({
				currentPage: this.state.currentPage - 1,
			});
		}
		this.props.callback(value);
	};
	handleNumberOfPage = () => {
		let numberOfPages: any[] = [];
		for (let i = 1; i <= this.props.pageTotal; i++) {
			numberOfPages.push(i);
		}
		if (this.props.pageTotal < 7) {
			return numberOfPages;
		} else {
			if (this.state.currentPage >= 1 && this.state.currentPage <= 3) {
				return [1, 2, 3, 4, "...", numberOfPages.length - 1, numberOfPages.length];
			} else if (this.state.currentPage > 3 && this.state.currentPage < numberOfPages.length - 2) {
				return [
					1,
					"...",
					this.state.currentPage - 1,
					this.state.currentPage,
					this.state.currentPage + 1,
					"...",
					numberOfPages.length,
				];
			} else {
				return [
					1,
					2,
					"...",
					numberOfPages.length - 3,
					numberOfPages.length - 2,
					numberOfPages.length - 1,
					numberOfPages.length,
				];
			}
		}
	};

	render() {
    const { pageTotal } = this.props;

		const arrPage = this.handleNumberOfPage();
    const disableComponent = pageTotal === 1 || this.props.disable
		return (
			<div className={`pagination-container ${disableComponent ? "disable" : ""} ${pageTotal > 1 ? "" : "hidden"}`}>
				<div
					className={`pagination-button ${this.state.currentPage === 1 ? "disabled" : ""}`}
					onClick={
						this.state.currentPage !== 1 ? () => this.handlePrevPage(this.state.currentPage - 1) : () => {}
					}>
          <Icon className="pagination-icon" iconName={"ChevronLeftSmall"} />
				</div>
				{arrPage.map((value, index) => (
					<div
						className={`pagination-button ${this.state.currentPage === value ? "active" : ""}`}
						key={index}
						onClick={() => this.handleCurrentPage(value)}>
						{value}
					</div>
				))}
				<div
					className={`pagination-button ${this.state.currentPage === this.props.pageTotal ? "disabled" : ""}`}
					onClick={
						this.state.currentPage !== this.props.pageTotal
							? () => this.handleNextPage(this.state.currentPage + 1)
							: () => {}
					}>
					<Icon className="pagination-icon" iconName={"ChevronRightSmall"} />
				</div>
			</div>
		);
	}
}

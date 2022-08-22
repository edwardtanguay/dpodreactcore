import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import 'custom/styles/main.scss';
import 'custom/styles/stylesPageCodeExercises.scss';
import * as qsys from 'datapod/qtools/qsys';
import * as qstr from 'datapod/qtools/qstr';
import { GoPencil } from 'react-icons/go';
import { ICodeExercise, getCodeExercises } from 'custom/models/model_codeExercises';
import * as config from 'datapod/classes/config';
import * as SystemTypes from 'datapod/classes/systemTypes';

const pageTitle = 'Code Exercises';

export enum CurrentlyShowing { nothing, hint, solution };

interface TheProps {
    changeSiteTitle: any
}
interface MainState {
    allItems: ICodeExercise[],
    filteredItems: ICodeExercise[],
    searchText: string,
    currentlyShowing: CurrentlyShowing
}

class CodeExercises extends Component<TheProps, MainState> {
    constructor(props: any) {
        super(props);

        this.state = {
            allItems: getCodeExercises(),
            filteredItems: [],
            searchText: '',
            currentlyShowing: CurrentlyShowing.nothing
        };
    }

    componentDidMount() {
        const initialSort: any = (a: any, b: any) => a.systemWhenCreated > b.systemWhenCreated ? -1 : a.systemWhenCreated < b.systemWhenCreated ? 1 : 0;
        const filteredItems: ICodeExercise[] = this.state.allItems.sort(initialSort);
        this.setState({
            filteredItems
        });
        this.buildHowManyText(filteredItems.length);

        // act on URL parameters
        const id: number = qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id'));
        if (id !== 0) {
            this.displaySingleItem(id);
        } else {
            const searchText = qsys.getParameterValueFromUrl('searchText');
            if (!qstr.isEmpty(searchText)) {
                this.setState({
                    searchText
                });
                this.displaySearchResults(searchText);
            }
        }
    }

    displaySingleItem = (id: number) => {
        const filteredItems: ICodeExercise[] = this.state.allItems.filter((m: any) => m.id === id);
        this.setState({
            filteredItems
        });
        this.buildHowManyText(1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    displayAll = () => {
        this.setState({
            searchText: '',
            filteredItems: this.state.allItems
        });
        qsys.changeBrowserState(document, 'codeExercises', '', '', pageTitle);
        this.props.changeSiteTitle(`${this.state.filteredItems.length} CodeExercises`);
    };

    getCurrentItem = (): ICodeExercise => {
        const item = this.state.filteredItems[0];
        qsys.changeBrowserState(document, 'codeExercises', 'id', String(item.id), `${item.category.toUpperCase()} CODE EXERCISE: ${item.title}`);
        return item;
    };

    displaySearchResults = (searchText: string) => {
        const theFilteredItems: ICodeExercise[] = this.state.allItems.filter((m: ICodeExercise) => qstr.searchTextMatches(searchText, [m.title, m.category, m.challenge, m.solution].join('|')));
        this.setState({
            searchText,
            filteredItems: theFilteredItems
        });
        if (qstr.isEmpty(searchText)) {
            qsys.changeBrowserState(document, 'codeExercises', '', '', pageTitle);
        } else {
            qsys.changeBrowserState(document, 'codeExercises', 'searchText', searchText, `Code Exercises Search: "${searchText}"`);
        }
        this.buildHowManyText(theFilteredItems.length);
    }

    searchKeywords = (event: any) => {
        const searchText: string = event.target.value;
        this.displaySearchResults(searchText);
    }

    convertChallengeToChallengeParsed = (codeExercise: ICodeExercise): string => {
        return qstr.parseOutline(codeExercise.challenge, 'codeExercises');
    }

    convertSolutionToSolutionParsed = (codeExercise: ICodeExercise): string => {
        return qstr.parseOutline(codeExercise.solution, 'codeExercises');
    }

    toggleHint = (): void => {
        if (this.state.currentlyShowing === CurrentlyShowing.hint) {
            this.setState({ currentlyShowing: CurrentlyShowing.nothing });
        } else {
            this.setState({ currentlyShowing: CurrentlyShowing.hint });
        }
    }

    toggleSolution(): void {
        if (this.state.currentlyShowing === CurrentlyShowing.solution) {
            this.setState({ currentlyShowing: CurrentlyShowing.nothing });
        } else {
            this.setState({ currentlyShowing: CurrentlyShowing.solution });
        }
    }

    buildSmartItemLink(item: ICodeExercise) {
        return `codeExercises?id=${item.id}`;
    }


    buildHowManyText(totalItemsShowing: number) {
        if (totalItemsShowing === this.state.allItems.length) {
            this.props.changeSiteTitle(`${totalItemsShowing} Code Exercises`);
        } else {
            this.props.changeSiteTitle(`${totalItemsShowing} of <a class="siteTitleLink" href="codeExercises">${this.state.allItems.length} Code Exercises</a>`);
        }
    }

    render() {
        return (
            <div className="pageCodeExercises">
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                {/* SEARCH  */}
                {(this.state.filteredItems.length !== 1 || this.state.searchText !== '') && (
                    <div className="searchArea">
                        <div className="searchRow">
                            <input id="mainSearch" placeholder="search codeExercises" type="text" value={this.state.searchText} className="form-control input-sm searchBox" onFocus={this.searchKeywords} onChange={this.searchKeywords} />
                        </div>
                    </div>
                )}

                {/* ========== MULTIPLE RECORDS ========== */}
                {this.state.filteredItems.length > 1 &&
                    (
                        <div className="listItemCodeExercises">
                            {this.state.filteredItems.map((item: ICodeExercise, index: number) => {
                                return (
                                    <div key={index} className="overview">
                                        <div className="header"><span className="category">{item.category}</span> <a href={this.buildSmartItemLink(item)}><span className="title">{item.title}</span></a></div>
                                    </div>
                                )
                            })}
                        </div >
                    )
                }

                {/* ========== ONE RECORD ========== */}
                {
                    this.state.filteredItems.length === 1 &&
                    (
                        <div className="item">
                            <div className="header">
                                <div><span className="category">{(`${this.getCurrentItem().category} code exercise`).toUpperCase()}</span> </div>
                                <div className="headerRow">
                                    <div className="title">{this.getCurrentItem().title}
                                        {
                                            config.currentApplicationLocation() === SystemTypes.ApplicationLocation.local &&
                                            (
                                                <a target="_blank" rel="noopener noreferrer" href={`http://localhost:29900/manageCodeExercise?returnUrl=codeExercises%C2%A7id=${this.getCurrentItem().id}&command=edit&id=${this.getCurrentItem().id}`}><GoPencil className="editIcon" /></a>
                                            )
                                        }
                                    </div>
                                    <div className="body">
                                        <div className="codeArea" dangerouslySetInnerHTML={{ __html: this.convertChallengeToChallengeParsed(this.getCurrentItem()) }} />
                                        <button type="button" className="btn btn-sm btn-normal hint" onClick={this.toggleHint}>Hint</button>
                                        <button type="button" className="btn btn-sm btn-normal solution" onClick={() => this.toggleSolution()}>Solution</button>
                                        {
                                            this.state.currentlyShowing === CurrentlyShowing.hint &&
                                            (
                                                <div>
                                                    <div className="hintArea">
                                                        <div>{this.getCurrentItem().hint}</div>
                                                        <div className="hintSolution">Your solution should output this:</div>
                                                    </div>
                                                    <img className="hintImage" src={this.getCurrentItem().imagePathAndFileName} alt="goal screenshot" />
                                                </div>
                                            )
                                        }
                                        {
                                            this.state.currentlyShowing === CurrentlyShowing.solution &&
                                            (
                                                <div>
                                                    <div className="codeArea" dangerouslySetInnerHTML={{ __html: this.convertSolutionToSolutionParsed(this.getCurrentItem()) }} />
                                                    <img className="hintImage" src={this.getCurrentItem().imagePathAndFileName} alt="goal screenshot" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* ========== NO RECORDS ========== */}
                {
                    this.state.filteredItems.length === 0 &&
                    (
                        <div>
                            Sorry, no items were found with this criteria.
                        </div>
                    )
                }

                {/* ========== NOT AUTHORIZED ========== */}
                {
                    false &&
                    (
                        <div className="alert alert-warning">
                            <strong>This page is no longer public.</strong>
                        </div>
                    )
                }
            </div >
        );
    }
}

export default CodeExercises;
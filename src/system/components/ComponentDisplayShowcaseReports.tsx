import ShowcaseReports from '../itemTypes/showcaseReports';
import ShowcaseReport from '../itemTypes/showcaseReport';
import ComponentDisplayShowcaseReport from './ComponentDisplayShowcaseReport';

interface IComponentDisplayShowcaseReportsProps {
    items: ShowcaseReports;
	editable?: boolean;
}

export const ComponentDisplayShowcaseReports = (props: IComponentDisplayShowcaseReportsProps) => {
    const showcaseReports = props.items;
    const showcaseReportsItemsArray = showcaseReports.getItems<ShowcaseReport>();
	const editable = props.editable === undefined ? true : props.editable;

    return (
        <>
            {showcaseReportsItemsArray.map((showcaseReport: ShowcaseReport, index) => {
                return (
                    <ComponentDisplayShowcaseReport key={index} item={showcaseReport} editable={editable} />
                )
            })}
        </>
    )
}

export default ComponentDisplayShowcaseReports;

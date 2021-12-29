/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState, useRef } from 'react';
import '../styles/dpodDisplayGeneric.scss';
import ShowcaseReport from '../itemTypes/showcaseReport';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Loader from "react-loader-spinner";
import FadeIn from 'react-fade-in';
import { FiCopy } from 'react-icons/fi';
import { FaInfo } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { GrRevert } from 'react-icons/gr';
import { BiSave } from 'react-icons/bi';

interface IComponentDisplayShowcaseReportProps {
	item: ShowcaseReport;
	editable?: boolean;
}

enum ComponentState {
	Loading,
	Viewing,
	Editing,
	Deleting,
	Adding,
	Copying
}

export const ComponentDisplayShowcaseReport = (props: IComponentDisplayShowcaseReportProps) => {

	const firstField: any = useRef(null);
	const [field_id, setField_id] = useState(0);
	const [field_title, setField_title] = useState('');
	const [field_description, setField_description] = useState('');
	const [field_systemWhenCreated, setField_systemWhenCreated] = useState('');
	const [field_systemWhoCreated, setField_systemWhoCreated] = useState('');
	const [showSystemInformation, setShowSystemInformation] = useState(false);
	const [componentState, setComponentState] = useState(ComponentState.Loading);
	const editable = props.editable === undefined ? true : props.editable;
	const [dataHasChanged, setDataHasChanged] = useState(false);

	useEffect(() => {
		if (firstField.current !== null) {
			firstField.current.focus();
		}
	}, [componentState]);

	useEffect(() => {
		assignFieldsFromItem();
		setComponentState(ComponentState.Viewing);
	}, []);

	const assignFieldsFromItem = () => {
		setField_id(props.item.get_id());
		setField_title(props.item.get_title());
		setField_description(props.item.get_description());
		setField_systemWhenCreated(props.item.get_systemWhenCreated());
		setField_systemWhoCreated(props.item.get_systemWhoCreated());
	}

	const handleClearButton = () => {
		setDataHasChanged(false);
		assignFieldsFromItem();
		setComponentState(ComponentState.Viewing);
	}

	const handleSaveButton = () => {
		// TODO: change to save state
		setDataHasChanged(false);
		assignFieldsFromItem();
		setComponentState(ComponentState.Viewing);
	}

	const toggleEditState = () => {
		if (componentState !== ComponentState.Editing) {
			setComponentState(ComponentState.Editing)
		} else {
			setComponentState(ComponentState.Viewing)
		}
	}

	const handleFieldChange_title = (e: any) => {
		setField_title(e.target.value);
		setDataHasChanged(true);
	}

	return (
		<FadeIn>
			<form className="item showcaseReportItem">
				<div className="header">
					<h3>Showcase Report</h3>
					{editable && (
						<div className="buttonPanel">
							<button type="button" disabled={dataHasChanged} className={`${componentState === ComponentState.Editing ? 'pressed' : ''} ${dataHasChanged ? 'disabled' : ''}`} title="edit item" onClick={() => toggleEditState()}><GrEdit /></button>
							<button type="button" className={`${componentState === ComponentState.Deleting ? 'pressed' : ''} ${dataHasChanged ? 'disabled' : ''}`} title="delete item"><RiDeleteBin6Line /></button>
							<button type="button" className={`${componentState === ComponentState.Adding ? 'pressed' : ''} ${dataHasChanged ? 'disabled' : ''}`} title="add item"><BsPlusLg /></button>
							<button type="button" className={`${componentState === ComponentState.Copying ? 'pressed' : ''} ${dataHasChanged ? 'disabled' : ''}`} title="copy item"><FiCopy /></button>
							<button type="button" className={showSystemInformation ? 'pressed' : ''} title="show/hide system fields" onClick={() => setShowSystemInformation(!showSystemInformation)}><FaInfo /></button>
						</div>
					)}
				</div>
				{componentState === ComponentState.Loading && (
					<Loader
						type="Circles"
						color="#aaa"
						height={70}
						width={70}
					/>
				)}
				{componentState === ComponentState.Viewing && (
					<>
						{showSystemInformation && (
							<div className="field dataType_wholeNumber systemInformation">
								<label className="fieldLabel">ID</label>
								<div className="fieldData">{field_id}</div>
							</div>
						)}
						<div className="field dataType_line">
							<label className="fieldLabel">Title</label>
							<div className="fieldData">{field_title}</div>
						</div>
						<div className="field dataType_line">
							<label className="fieldLabel">Description</label>
							<div className="fieldData">{field_description}</div>
						</div>
						{showSystemInformation && (
							<div className="field dataType_wholeNumber systemInformation">
								<label className="fieldLabel">System When Created</label>
								<div className="fieldData">{field_systemWhenCreated}</div>
							</div>
						)}
						{showSystemInformation && (
							<div className="field dataType_wholeNumber systemInformation">
								<label className="fieldLabel">System Who Created</label>
								<div className="fieldData">{field_systemWhoCreated}</div>
							</div>
						)}
					</>
				)}
				{componentState === ComponentState.Editing && (
					<>
						{showSystemInformation && (
							<div className="field dataType_wholeNumber systemInformation">
								<label className="fieldLabel">ID</label>
								<div className="fieldData">{field_id}</div>
							</div>
						)}
						<div className="field dataType_line">
							<label className="fieldLabel">Title</label>
							<input type="text" value={field_title} ref={firstField} onChange={handleFieldChange_title} />
						</div>
						<div className="field dataType_line">
							<label className="fieldLabel">Description</label>
							<input type="text" value={field_description} onChange={(e) => setField_description(e.target.value)} />
						</div>
						{showSystemInformation && (
							<div className="field dataType_wholeNumber systemInformation">
								<label className="fieldLabel">System When Created</label>
								<div className="fieldData">{field_systemWhenCreated}</div>
							</div>
						)}
						{showSystemInformation && (
							<div className="field dataType_wholeNumber systemInformation">
								<label className="fieldLabel">System Who Created</label>
								<div className="fieldData">{field_systemWhoCreated}</div>
							</div>
						)}
						{dataHasChanged && (
							<div className="formButtonArea">
								<button type="button" className="clear iconButton" onClick={handleClearButton}><span className="text">Clear</span><GrRevert className="icon" /> </button>
								<button type="button" onClick={handleSaveButton} className="save iconButton"><span className="text">Save</span><BiSave className="icon" /></button>
							</div>
						)}
					</>
				)}
			</form>
		</FadeIn>
	)
}

export default ComponentDisplayShowcaseReport;
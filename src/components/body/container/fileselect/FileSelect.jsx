import React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import classNames from "classnames";
import FileSelectCSS from "./FileSelect.module.css";
import { mapState, mapDispatch } from "./FileSelect.map";
import * as FileSelectLogic from "./FileSelect.logic";
import { connect } from "react-redux";

const FileSelect = (props) => {
	return (
		<Dropzone onDrop={(fileList) => FileSelectLogic.onDrop(props, fileList)}>
			{({ getRootProps, getInputProps, isDragActive }) => {
				return (
					<div
						{...getRootProps()}
						className={
							classNames("dropzone", { "dropzone--isActive": isDragActive }) +
							" " +
							FileSelectCSS.fileselect
						}
					>
						<input {...getInputProps()} />
						<h1 className="ant-upload-drag-icon icon">
							<Icon type="inbox" />
						</h1>
						<p className="ant-upload-text">Тухайн файлаа энэхүү хэсэгт оруулна уу.</p>
						<p className={FileSelectCSS.smallerfont + " ant-upload-hint"}>
							Энэ цонхон дээр дарж мөн чирж оруулж ирэх боломжтой.
						</p>
					</div>
				);
			}}
		</Dropzone>
	);
};

export default connect(mapState, mapDispatch)(FileSelect);

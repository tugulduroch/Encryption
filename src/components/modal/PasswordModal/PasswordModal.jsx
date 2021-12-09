import React, { Component } from "react";
import { Modal, Form, Input, Icon } from "antd";
import { connect } from "react-redux";
import { mapState, mapDispatch } from "./PasswordModal.map";
import * as PasswordModalLogic from "./PasswordModal.logic";
import PasswordMeter from "./PasswordMeter/PasswordMeter";

const PasswordModalForm = Form.create({ name: "form_in_modal" })(
	class extends Component {
		render() {
			const { visible, onCancel, onCreate, form, hint, mode } = this.props;
			const { getFieldDecorator } = form;
			let passwordField = this.props.form.getFieldValue("password");

			return (
				<Modal
					visible={visible}
					title={mode !== "decrypt" ? "Файл шифрлэх" : "Шифр тайлах"}
					okText={mode !== "decrypt" ? "Шифрлэх" : "Шифр тайлах"}
					onCancel={onCancel}
					onOk={onCreate}
				>
					<Form layout="vertical">
						<Form.Item label="Нууц үг">
							{getFieldDecorator("password", {
								rules: [ { required: true, message: "Нууц үгээ бичнэ үү..." } ]
							})(<Input.Password placeholder="Нууц үгээ бичнэ үү..." />)}

							{mode !== "decrypt" ? <PasswordMeter password={passwordField} /> : ""}
						</Form.Item>
						{hint !== null || mode !== "decrypt" ? (
							<Form.Item label="Тусламж">
								{mode !== "decrypt" ? (
									getFieldDecorator("hint", {
										rules: [ { required: false } ]
									})(
										<Input
											placeholder="Тухайн хэрэглэгчид туслах заавар бичнэ үү."
											prefix={<Icon type="info-circle" style={{ color: "rgb(0,0,0)" }} />}
										/>
									)
								) : (
									hint
								)}
							</Form.Item>
						) : null}
					</Form>
				</Modal>
			);
		}
	}
);

class PasswordModal extends Component {
	handleCreate = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			form.resetFields();
			PasswordModalLogic.onFormData(this.props, values);
		});
	};

	saveFormRef = (formRef) => {
		this.formRef = formRef;
	};

	onReset = () => {
		const form = this.formRef.props.form;
		form.resetFields();
		this.props.onReset();
	};

	render() {
		return (
			<PasswordModalForm
				wrappedComponentRef={this.saveFormRef}
				visible={this.props.modal.show}
				onCancel={this.onReset}
				onCreate={this.handleCreate}
				hint={this.props.hint}
				mode={this.props.mode}
			/>
		);
	}
}

export default connect(mapState, mapDispatch)(PasswordModal);

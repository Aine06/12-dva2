import { Modal, Button , message } from 'antd';

class UserModalalert extends React.Component {
  state = { visible: true }
 
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Modal
          title="啦啦啦"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>获取成功咯</p>
        </Modal>
      </div>
    );
  }
}

export default UserModalalert;

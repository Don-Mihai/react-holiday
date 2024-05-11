import { StepData } from '../../redux/Step/types';
import { Tooltip } from '@mui/material';
import './style.scss';
import cls from 'classnames';
import { Handle, Position } from 'react-flow-renderer';

interface Props {
  data: StepData;
}
const CustomNode = ({ data }: Props) => {
  return (
    <Tooltip title={data.title} placement="right">
      <div className="container">
        <Handle type="target" position={Position.Top} isConnectable={true} />
        <img className={cls('node__img', { uncompleted: !data.completed })} src={data.imgUrl} alt="" />
        <Handle type="source" position={Position.Bottom} id="a" isConnectable={true} />
      </div>
    </Tooltip>
  );
};

export default CustomNode;

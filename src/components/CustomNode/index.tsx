import { StepData } from '../../redux/Step/types';
import { Tooltip } from '@mui/material';
import style from './style.module.scss';
import cls from 'classnames';
import { Handle, Position } from 'react-flow-renderer';

interface Props {
  data: StepData;
}
const DEFAULT_HANDLE_STYLE = {
  width: 15,
  height: 15,
  bottom: -8,
};

const CustomNode = ({ data }: Props) => {
  return (
    <Tooltip title={data.title} placement="right">
      <div className={style.container}>
        <Handle type="target" position={Position.Top} id="red" isConnectable={true} style={{ ...DEFAULT_HANDLE_STYLE, background: '#1976d2' }} />
        {data?.imgUrl ? (
          <img className={cls('node__img', { uncompleted: !data.completed })} src={data.imgUrl} alt="" />
        ) : (
          <p className={style.text}>{data.title}</p>
        )}

        <Handle type="source" position={Position.Bottom} id="blue" isConnectable={true} style={{ ...DEFAULT_HANDLE_STYLE, background: '#1976d2' }} />
      </div>
    </Tooltip>
  );
};

export default CustomNode;

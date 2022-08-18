import { Tag, Image } from 'antd';
import { formatYear, formatBirth, formatDate } from '../../../utils/format';
import loadErrorImg from 'common/img/load_error.png';
import { mapData } from 'utils/mapData';
import { staffRule } from '../../../utils/staffRule';
import IconMap from '../../../components/IconMap';

const Columns = ({
  handleSave,
  staffList,
  openReviewRecord,
  openDetailDialog,
}) => {
  let columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      editable: true,
      render: (userName, { _id }) => {
        return (
          <>
            <span className="user-name">{userName}</span>
            <span
              className="c-r"
              onClick={(e) => {
                e.stopPropagation();
                openDetailDialog(_id);
              }}
            >
              {IconMap.detail}
            </span>
          </>
        );
      },
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      editable: true,
    },
    {
      title: '职级描述',
      dataIndex: 'level',
      editable: true,
      render: (data) => data?.levelDescription || '暂无职级描述',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      render: (gender) => <Tag>{gender === 1 ? '男' : '女'}</Tag>,
    },
    {
      title: '部门',
      dataIndex: 'department',
      editable: true,
      render: (data) => data?.department || '---',
    },
    {
      title: '部门负责人',
      dataIndex: 'department',
      editable: true,
      render: (data) => data?.departmentLeader?.userName || '---',
    },
    {
      title: '入职时间',
      dataIndex: 'onboardingTime',
      editable: true,
      render: (date) => formatDate(date, 'YYYY-MM-DD'),
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      editable: true,
      render: (img) => <Image src={img || 'error'} fallback={loadErrorImg} />,
    },
    {
      title: '籍贯',
      editable: true,
      dataIndex: 'hometown',
      render: (hometown) => hometown || '---',
    },
    {
      title: '学历',
      editable: true,
      dataIndex: 'education',
      render: (type) => <Tag> {mapData['education'][type]}</Tag>,
    },
    {
      title: '婚姻状况',
      editable: true,
      dataIndex: 'marriage',
      render: (type) => <Tag> {mapData['marriage'][type]}</Tag>,
    },
    {
      title: '银行卡',
      dataIndex: 'bankNumber',
      editable: true,
    },
    {
      title: '身份证号',
      editable: true,
      dataIndex: 'idNumber',
    },
    {
      title: '毕业院校',
      editable: true,
      dataIndex: 'graduatedSchool',
    },
    {
      title: '绩效考核',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: '考核记录',
                interfaceName: 'getAssessmentList',
                requestData: {
                  queryData: { staffName: data._id },
                },
                type: 'assessment',
              })
            }
            className="c-p"
          >
            查看
          </Tag>
        );
      },
    },
    {
      title: '奖惩记录',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: '奖惩记录',
                interfaceName: 'getRewardAndPunishment',
                requestData: {
                  staffName: data._id,
                },
                type: 'reward',
              })
            }
            className="c-p"
          >
            查看
          </Tag>
        );
      },
    },
    {
      title: '调薪记录',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: '调薪记录',
                interfaceName: 'getSalaryAdjustment',
                requestData: {
                  staffName: data._id,
                },
                type: 'salary',
              })
            }
            className="c-p"
          >
            查看
          </Tag>
        );
      },
    },
  ].map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => {
        //- 创建一个规定编辑表单类型的属性type
        let type = '';

        switch (col.dataIndex) {
          case 'onboardingTime':
            type = 'dateNode';
            break;
          case 'gender':
          case 'education':
          case 'marriage':
            type = 'selectNode';
            break;
          default:
            type = 'inputNode';
            break;
        }

        return {
          type,
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          rules: staffRule[col.dataIndex],
          handleSave,
        };
      },
    };
  });

  return columns;
};

export default Columns;

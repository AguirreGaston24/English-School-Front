import { Avatar, Card, Collapse, CollapseProps, Divider, List, Select, Skeleton, Tag } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react'
// @ts-ignore

import BarcodeReader from 'react-barcode-reader'

import { createassists, getAllassists } from '../../api/assists';
import { useDataContext } from '../../context/data';
import { toast } from 'sonner';
import { MdMoreHoriz, MdMoreVert } from 'react-icons/md';
import { IStudent } from '../../interfaces/student';
import moment from 'moment';

export const AssistsScreen = () => {
  const { students, teachers } = useDataContext()
  const [loading, setLoading] = useState(false);
  const [assists, setAssists] = useState<any>([]);


  const handleScan = (data: any) => {
    createassists({
      student_id: data,
      course_id: "6601781b42541903e6a9ab00",
      date: new Date().toISOString(),
      status: "presente"
    })
      .then(({ data }) => {
        loadMoreData()
        toast.success('Alumno registrado con exito')
      })
      .catch((err) => {
        console.log(err)
        toast.success('Error al registar el alumno')
      })
  }
  function handleError(err: any) {
    console.error(err)
  }


  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true)
    getAllassists()
      .then(({ data }) => {
        setAssists([...data.response]);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  };


  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>asdasds</p>,
    },
  ];

  useEffect(() => {
    loadMoreData();
  }, []);


  return (
    <div className='grid grid-cols-5 gap-2'>
      <div className='col-span-2'>
        <div className='flex gap-2 mb-4'>
          <Select className='w-full' options={teachers.map((t) => ({ label: `${t.firstname} ${t.lastname}`, value: `${t.firstname} ${t.lastname}` }))} />
        </div>
        <Card
          className='overflow-auto'
          id='scrollableDiv'
          style={{ height: '80%' }}
        >
          <InfiniteScroll
            dataLength={2}
            next={loadMoreData}
            hasMore={students.length < 10}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={students}
              renderItem={(item: IStudent) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar />}
                    title={<p >{`${item.firstname} ${item.lastname}`}</p>}
                    description={item.teacher}
                  />
                  <div><MdMoreHoriz size={24} /></div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Card>
      </div>
      <div className='col-span-3'> {/* una grilla de 3/4 */}
        <BarcodeReader
          onError={handleError}
          onScan={handleScan}
        />
        <div className='flex gap-2 mb-4'>
          <Select />
        </div>
        <Card
          className='overflow-auto'
          id='scrollableDiv'
          style={{ height: '80%' }}
        >
          <InfiniteScroll
            dataLength={assists.length}
            next={loadMoreData}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={assists}
              renderItem={(item: any) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar />}
                    title={<p >{`${item.student_id.firstname} ${item.student_id.lastname}`}</p>}
                    description={moment(item.date).format('h:mm a, DD MMMM. YYYY')}
                  />
                  <Tag>{item.status}</Tag>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Card>
      </div>
    </div>
  )
}

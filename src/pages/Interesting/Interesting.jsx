import React, { useState } from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "./Interesting.css"
import { Image } from 'antd';
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];
const Interesting = () => {
    const [visible, setVisible] = useState(false);
  return (
    <div className=''>
        <div className='max-w-[1000px] mx-auto py-[30px]'>
        <Box>
      <ImageList variant="masonry" cols={3} gap={8}>
        
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            {/* <div className='like w-full flex  absolute h-[100%] bg-[#0000003c] items-center justify-center gap-x-[30px]'>
                <p className='text-[#FFF] font-[600]'>likes 54</p>
                <p  className='text-[#FFF] font-[600]'>Comments 30</p>
            </div> */}
            <Image
             preview={false}
            width="100%"
    src={`${item.img}?w=248&fit=crop&auto=format`}
    loading="lazy"
    onClick={() => setVisible(true)}
    className='cursor-pointer'
    
  />
  <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
        </Image.PreviewGroup>
      </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
        </div>
    </div>
  )
}

export default Interesting
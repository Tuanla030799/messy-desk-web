export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: unknown
  date: string
  mood: string
  readTime: string
  tags: string[]
  accent: string
}

export type Note = {
  title: string
  body: string
  label: string
  pin: string
}

export type Project = {
  name: string
  summary: string
  status: string
  stack: string[]
  accent: string
}

export type GalleryItem = {
  title: string
  caption: string
  palette: string[]
  shape: string
}

export type Experiment = {
  slug: string
  name: string
  description: string
  type: string
  accent: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'morning-interface-notes',
    title: 'Morning interface notes',
    excerpt:
      'Nhung ghi chep nho ve micro-interaction, spacing va cam giac khi mot giao dien biet tho.',
    content: {
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: 'Day la template bai viet mau. Ban co the thay noi dung nay bang markdown, CMS hoac API sau nay.',
          },
        },
        {
          type: 'paragraph',
          data: {
            text: 'Y tuong cua project la giu cau truc that don gian: du lieu o mot noi, UI o mot noi, moi trang nho co the tu do bien thanh mot experiment rieng.',
          },
        },
      ],
    },
    date: '15 May 2026',
    mood: 'curious',
    readTime: '4 min',
    tags: ['ui', 'notes', 'design'],
    accent: '#f9a826',
  },
  {
    slug: 'tiny-tools-i-want-to-build',
    title: 'Tiny tools I want to build',
    excerpt:
      'Danh sach nhung cong cu nho cho ban than: mood tracker, snippet garden, sketch timer va mot cho de cat giu y tuong.',
    content:
      '<h2>Tiny tools</h2><p>Mot danh sach nho cho admin sau nay: upload anh, viet blog, xem preview va luu nhap nhanh.</p><ul><li>Mood tracker</li><li>Snippet garden</li><li>Sketch timer</li></ul>',
    date: '08 May 2026',
    mood: 'building',
    readTime: '6 min',
    tags: ['ideas', 'tools'],
    accent: '#35c6a4',
  },
  {
    slug: 'play-is-a-workflow',
    title: 'Play is a workflow',
    excerpt:
      'Thu nghiem nghi tuc lam viec bang tinh than choi: prototype nhanh, dat ten vui, de man hinh co nhieu khoang thoang.',
    content:
      '<p>Tinh than chinh: nhieu khoang trang, card co ca tinh, net ve tay vua du, va moi interaction deu co chut am ap nhu dang lam viec tren ban ve ca nhan.</p>',
    date: '26 Apr 2026',
    mood: 'playful',
    readTime: '5 min',
    tags: ['process', 'creative'],
    accent: '#ff6f91',
  },
]

export const notes: Note[] = [
  {
    title: 'Page idea',
    body: 'Mot trang luu lai cac “what if” cua UI: nut bam biet doi mau theo gio, form nhu cuon so ve tay.',
    label: 'idea',
    pin: '#ff6f91',
  },
  {
    title: 'Sketch prompt',
    body: 'Ve mot empty state cho thu vien bai viet: ban ve, mot o tim kiem, vai net chi dang bay.',
    label: 'prompt',
    pin: '#35c6a4',
  },
  {
    title: 'Personal rule',
    body: 'Moi project nho phai co it nhat mot chi tiet lam minh muon cham vao no lan nua.',
    label: 'principle',
    pin: '#f9a826',
  },
]

export const projects: Project[] = [
  {
    name: 'Snippet Garden',
    summary: 'Thu vien snippet va pattern frontend gom cac manh code hay dung, co tag va preview.',
    status: 'prototype',
    stack: ['Nuxt', 'MDX', 'Search'],
    accent: '#8b7cf6',
  },
  {
    name: 'Moodboard Desk',
    summary: 'Khong gian keo tha anh, mau, typography va link tham khao cho tung y tuong.',
    status: 'concept',
    stack: ['Vue', 'Canvas', 'Local data'],
    accent: '#35c6a4',
  },
  {
    name: 'Tiny Timer',
    summary: 'Pomodoro nho gon voi animation ve tay va am thanh rat nhe khi het gio.',
    status: 'shipping soon',
    stack: ['Vue', 'CSS motion'],
    accent: '#f9a826',
  },
]

export const gallery: GalleryItem[] = [
  {
    title: 'Paper grid',
    caption: 'Mot nen giay nhe cho cac y tuong dang duoc phac thao.',
    palette: ['#fffaf0', '#ffe7ba', '#2f4858'],
    shape: 'grid',
  },
  {
    title: 'Sticker set',
    caption: 'Nhung sticker nho danh dau bai viet, ghi chu va experiment.',
    palette: ['#ff6f91', '#35c6a4', '#f9a826'],
    shape: 'stickers',
  },
  {
    title: 'Window doodles',
    caption: 'Khung preview cho playground: co nut, co net ve, co chut lech vui.',
    palette: ['#8b7cf6', '#bde0fe', '#101828'],
    shape: 'window',
  },
]

export const experiments: Experiment[] = [
  {
    slug: 'wobbly-card-lab',
    name: 'Wobbly card lab',
    description: 'Card nghieng nhe theo hover, hop cho gallery va project teaser.',
    type: 'interaction',
    accent: '#ff6f91',
  },
  {
    slug: 'doodle-loader',
    name: 'Doodle loader',
    description: 'Icon loading nhu but chi dang ve mot vong tron chua khop.',
    type: 'motion',
    accent: '#f9a826',
  },
  {
    slug: 'empty-state-maker',
    name: 'Empty state maker',
    description: 'Bo minh hoa empty state cho cac man hinh chua co noi dung.',
    type: 'component',
    accent: '#35c6a4',
  },
]

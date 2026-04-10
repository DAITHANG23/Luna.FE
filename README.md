# 🌙 Luna - Restaurant Booking System (Frontend)

Luna là nền tảng đặt bàn nhà hàng hiện đại, hiệu năng cao, được thiết kế để mang lại trải nghiệm khám phá và đặt chỗ ẩm thực mượt mà nhất. Dự án sử dụng các công nghệ tiên tiến nhất trong hệ sinh thái React/Next.js.

## ✨ Tính năng nổi bật

- 🔍 **Khám phá Nhà hàng**: Tìm kiếm và lọc nhà hàng theo concept, vị trí và tiện ích.
- 📅 **Hệ thống Đặt bàn**: Quy trình đặt chỗ trực quan, hỗ trợ chọn concept và thời gian thực.
- 🔐 **Xác thực Đa phương thức**: Đăng nhập qua Email/Password và Google OAuth.
- 🌐 **Đa ngôn ngữ (i18n)**: Hỗ trợ đầy đủ Tiếng Anh và Tiếng Việt.
- 🔔 **Thông báo Real-time**: Cập nhật trạng thái đặt bàn tức thời qua Socket.io.
- 🗺️ **Tích hợp Bản đồ**: Hiển thị vị trí nhà hàng với Leaflet và Google Maps.
- 📱 **Responsive Design**: Tối ưu hóa trải nghiệm trên mọi thiết bị (Mobile, Tablet, Desktop).
- 🌓 **Chế độ Sáng/Tối**: Giao diện linh hoạt theo sở thích người dùng.

## 🛠️ Công nghệ sử dụng

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Headless UI](https://headlessui.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Form Management**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **Real-time**: [Socket.io Client](https://socket.io/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🚀 Bắt đầu nhanh

### Yêu cầu hệ thống

- Node.js 20+
- npm hoặc yarn

### Cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/your-repo/luna-fe.git
   cd luna-fe
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Cấu hình biến môi trường:
   Sao chép file `.env.example` thành `.env` và điền các giá trị cần thiết:
   ```bash
   cp .env.example .env
   ```

4. Chạy môi trường phát triển:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại [http://localhost:5000](http://localhost:5000)

## 📁 Cấu trúc thư mục chính

```text
src/
├── @types/          # Định nghĩa TypeScript interfaces/types
├── api/             # Cấu hình Axios và các API endpoints
├── app/             # Next.js App Router (Routes, Layouts)
├── components/      # Các UI components dùng chung
├── constants/       # Các hằng số, config hệ thống
├── contexts/        # React Contexts
├── features/        # Logic nghiệp vụ theo tính năng (hooks, sockets)
├── libs/            # Cấu hình Redux, i18n, shared components
└── utils/           # Các hàm tiện ích
```

## 📜 Các lệnh script chính

- `npm run dev`: Chạy dev server tại port 5000.
- `npm run build`: Build dự án cho production.
- `npm run start`: Chạy bản build production.
- `npm run lint`: Kiểm tra lỗi code style.
- `npm run format`: Tự động format code với Prettier.

---
© 2024 Luna Project. Built with ❤️ for the best dining experience.

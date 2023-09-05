interface BabinjeItem {
  id: number; // = Column(Integer, primary_key=True)
  name: string; // = Column(String(255), nullable=False)
  desc?: string; // = Column(String(10000), nullable=True)
  img_url?: string; // = Column(String(255), nullable=True)
  isBought: number; // = Column(Integer, nullable=False, default=0)
  link?: string;
  user?: User;
}

interface User {
  id: number;
  email: string;
}

interface ApiResponse<T> {
  data?: T;
}

export type { BabinjeItem, ApiResponse, User };

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  author: string;
  isFavorite: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'remote', label: 'Удалёнка' },
    { value: 'onsite', label: 'Живая подработка' },
  ];

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Разработка лендинга для стартапа',
      description: 'Требуется создать современный одностраничный сайт с адаптивным дизайном',
      category: 'remote',
      price: '25 000 ₽',
      rating: 4.8,
      reviews: 24,
      author: 'Алексей М.',
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Дизайн логотипа для кафе',
      description: 'Нужен минималистичный логотип в современном стиле',
      category: 'remote',
      price: '8 000 ₽',
      rating: 4.9,
      reviews: 156,
      author: 'Мария К.',
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Копирайтинг статей для блога',
      description: 'Написание SEO-оптимизированных статей на технологическую тематику',
      category: 'remote',
      price: '3 000 ₽',
      rating: 4.7,
      reviews: 89,
      author: 'Дмитрий П.',
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Настройка рекламы в Яндекс.Директ',
      description: 'Требуется специалист для настройки и ведения рекламных кампаний',
      category: 'onsite',
      price: '15 000 ₽',
      rating: 4.6,
      reviews: 42,
      author: 'Елена В.',
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Перевод технической документации',
      description: 'Перевод с английского на русский, тематика IT',
      category: 'remote',
      price: '1 500 ₽',
      rating: 5.0,
      reviews: 213,
      author: 'Ирина С.',
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Создание презентации для инвесторов',
      description: 'Нужна качественная презентация проекта, до 20 слайдов',
      category: 'onsite',
      price: '12 000 ₽',
      rating: 4.8,
      reviews: 67,
      author: 'Сергей Н.',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteJobs = jobs.filter(job => favorites.includes(job.id));

  const renderJobCard = (job: Job) => (
    <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <Badge variant="secondary" className="mb-2">
              {categories.find(c => c.value === job.category)?.label}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(job.id)}
            className="hover:scale-110 transition-transform"
          >
            <Icon
              name={favorites.includes(job.id) ? 'Heart' : 'Heart'}
              size={20}
              className={favorites.includes(job.id) ? 'fill-red-500 text-red-500' : ''}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{job.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{job.rating}</span>
            <span className="text-muted-foreground">({job.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="User" size={16} />
            <span>{job.author}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">{job.price}</div>
        <Button>Откликнуться</Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Briefcase" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">Работёнка</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost">Главная</Button>
              <Button variant="ghost">Поиск</Button>
              <Button variant="ghost">Разместить</Button>
              <Button variant="ghost">Профиль</Button>
              <Button variant="ghost">
                <Icon name="MessageSquare" size={20} />
              </Button>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Найди идеальную подработку
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Тысячи заказов и исполнителей в одном месте
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 animate-scale-in">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Найти подработку..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 px-8">
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="all">Все заказы</TabsTrigger>
            <TabsTrigger value="favorites">
              Избранное ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(renderJobCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Ничего не найдено</p>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteJobs.map(renderJobCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">В избранном пока пусто</p>
                <p className="text-muted-foreground">Добавьте интересные заказы в избранное</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Briefcase" size={24} className="text-primary" />
                Работёнка
              </h3>
              <p className="text-sm text-muted-foreground">
                Платформа для поиска подработки и надежных исполнителей
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Удалёнка</li>
                <li>Живая подработка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Правила</li>
                <li>Помощь</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@rabotaryadom.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Работёнка. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
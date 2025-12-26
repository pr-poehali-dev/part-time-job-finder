import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface PostJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (job: any) => void;
}

export const PostJobDialog = ({ open, onOpenChange, onSubmit }: PostJobDialogProps) => {
  const [formType, setFormType] = useState<'employer' | 'worker'>('employer');

  const [employerForm, setEmployerForm] = useState({
    title: '',
    city: '',
    address: '',
    date: '',
    duration: '',
    workersNeeded: '1',
    hourlyRate: '',
    description: '',
  });

  const [workerForm, setWorkerForm] = useState({
    title: '',
    city: '',
    availableTime: '',
    duration: '',
    teamSize: '1',
    isBrigade: false,
    hourlyRate: '',
    description: '',
  });

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: 'employer',
      ...employerForm,
      category: 'onsite',
      rating: 0,
      reviews: 0,
      author: 'Новый заказчик',
      isFavorite: false,
    });
    resetForms();
    onOpenChange(false);
  };

  const handleWorkerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: 'worker',
      ...workerForm,
      category: 'remote',
      rating: 0,
      reviews: 0,
      author: 'Новый работник',
      isFavorite: false,
    });
    resetForms();
    onOpenChange(false);
  };

  const resetForms = () => {
    setEmployerForm({
      title: '',
      city: '',
      address: '',
      date: '',
      duration: '',
      workersNeeded: '1',
      hourlyRate: '',
      description: '',
    });
    setWorkerForm({
      title: '',
      city: '',
      availableTime: '',
      duration: '',
      teamSize: '1',
      isBrigade: false,
      hourlyRate: '',
      description: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Разместить объявление</DialogTitle>
          <DialogDescription>
            Выберите тип объявления и заполните информацию
          </DialogDescription>
        </DialogHeader>

        <Tabs value={formType} onValueChange={(v) => setFormType(v as 'employer' | 'worker')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="employer">
              <Icon name="Briefcase" size={16} className="mr-2" />
              Ищу работника
            </TabsTrigger>
            <TabsTrigger value="worker">
              <Icon name="User" size={16} className="mr-2" />
              Ищу работу
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employer">
            <form onSubmit={handleEmployerSubmit} className="space-y-4">
              <div>
                <Label htmlFor="emp-title">Название работы *</Label>
                <Input
                  id="emp-title"
                  placeholder="Например: Помощь с переездом"
                  value={employerForm.title}
                  onChange={(e) => setEmployerForm({ ...employerForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emp-city">Город *</Label>
                  <Input
                    id="emp-city"
                    placeholder="Москва"
                    value={employerForm.city}
                    onChange={(e) => setEmployerForm({ ...employerForm, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emp-address">Адрес *</Label>
                  <Input
                    id="emp-address"
                    placeholder="ул. Ленина, 10"
                    value={employerForm.address}
                    onChange={(e) => setEmployerForm({ ...employerForm, address: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emp-date">Дата *</Label>
                  <Input
                    id="emp-date"
                    type="date"
                    value={employerForm.date}
                    onChange={(e) => setEmployerForm({ ...employerForm, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emp-duration">Длительность *</Label>
                  <Input
                    id="emp-duration"
                    placeholder="4 часа"
                    value={employerForm.duration}
                    onChange={(e) => setEmployerForm({ ...employerForm, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emp-workers">Требуется человек *</Label>
                  <Input
                    id="emp-workers"
                    type="number"
                    min="1"
                    value={employerForm.workersNeeded}
                    onChange={(e) => setEmployerForm({ ...employerForm, workersNeeded: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emp-rate">Оплата за час (₽) *</Label>
                  <Input
                    id="emp-rate"
                    type="number"
                    min="0"
                    placeholder="500"
                    value={employerForm.hourlyRate}
                    onChange={(e) => setEmployerForm({ ...employerForm, hourlyRate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="emp-description">Описание работы *</Label>
                <Textarea
                  id="emp-description"
                  placeholder="Опишите что требуется сделать..."
                  rows={4}
                  value={employerForm.description}
                  onChange={(e) => setEmployerForm({ ...employerForm, description: e.target.value })}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Отмена
                </Button>
                <Button type="submit">Разместить заказ</Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="worker">
            <form onSubmit={handleWorkerSubmit} className="space-y-4">
              <div>
                <Label htmlFor="work-title">Заголовок *</Label>
                <Input
                  id="work-title"
                  placeholder="Например: Готов помочь с переездом"
                  value={workerForm.title}
                  onChange={(e) => setWorkerForm({ ...workerForm, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="work-city">Город *</Label>
                <Input
                  id="work-city"
                  placeholder="Москва"
                  value={workerForm.city}
                  onChange={(e) => setWorkerForm({ ...workerForm, city: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="work-time">Время готов работать *</Label>
                  <Input
                    id="work-time"
                    placeholder="с 10:00 до 18:00"
                    value={workerForm.availableTime}
                    onChange={(e) => setWorkerForm({ ...workerForm, availableTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="work-duration">Длительность *</Label>
                  <Input
                    id="work-duration"
                    placeholder="4 часа"
                    value={workerForm.duration}
                    onChange={(e) => setWorkerForm({ ...workerForm, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="work-team">Количество человек *</Label>
                  <Input
                    id="work-team"
                    type="number"
                    min="1"
                    value={workerForm.teamSize}
                    onChange={(e) => {
                      const size = e.target.value;
                      setWorkerForm({ 
                        ...workerForm, 
                        teamSize: size,
                        isBrigade: parseInt(size) > 1 
                      });
                    }}
                    required
                  />
                  {parseInt(workerForm.teamSize) > 1 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <Icon name="Users" size={14} className="inline mr-1" />
                      Бригада
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="work-rate">Желаемая оплата за час (₽) *</Label>
                  <Input
                    id="work-rate"
                    type="number"
                    min="0"
                    placeholder="500"
                    value={workerForm.hourlyRate}
                    onChange={(e) => setWorkerForm({ ...workerForm, hourlyRate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="work-description">О себе и навыках *</Label>
                <Textarea
                  id="work-description"
                  placeholder="Расскажите о себе и что умеете..."
                  rows={4}
                  value={workerForm.description}
                  onChange={(e) => setWorkerForm({ ...workerForm, description: e.target.value })}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Отмена
                </Button>
                <Button type="submit">Разместить анкету</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

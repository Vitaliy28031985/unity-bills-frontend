export const ERROR_MESSAGES_UA: Record<string, string> = {
    'User is exist!': 'Користувач вже існує!',
    'You have entered invalid data!': 'Ви ввели недійсні дані!',
    'user is empty!': 'Користувача не існує!',
    'This user is empty!': 'Користувача не існує!',
    'This user has allow!': 'Цьому користувачу вже надано дозвіл!',
    'You is not owner this list!': 'Ви не власник цього списку витрат!',
    'This user don`t have allow!': 'Цей користувач не має дозволу!',
    'This list does not exist!': 'Цього списку не існує!',
    'You are not the owner of this list!': 'Ви не є власником цього списку!',
    'Cost list is exist!': 'Список витрат вже існує!',
    'You don`t have any list!': 'У вас немає жодного списку!',
    'There is no such list!': 'Такого списку немає!',
    'Cost is exist!': 'Витрата вже існує!',
    'Invalid number or price': 'Недійсний номер або ціна!',
    'This cost does not exist!': 'Цієї вартості не існує!',
    'You don`t have any fixed costs!': 'У вас немає жодних постійних витрат!',
    'This value is missing!': 'Це значення відсутнє!',
    'price isn`t number': 'Ціна не число!',
    'Price is exist!': 'Ця ціна вже є!',
    'These prices are empty!': 'Цієї ціни не існує!',
    'This price is not exist!': 'Цієї ціни не існує!',
    
};

export function translateBackendError(
  message: string | undefined
): string {
  if (!message) {
    return 'Сталася невідома помилка';
  }

  return ERROR_MESSAGES_UA[message] ?? message;
}


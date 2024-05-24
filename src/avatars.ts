const avatars = [
  "https://api.dicebear.com/8.x/bottts/svg?seed=Coco",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Miss%20kitty",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Sheba",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Buster",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Patches",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Pepper",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Cali",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Tigger",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Abby",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Rocky",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Spooky",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Charlie",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Bandit",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Harley",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Sugar",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Samantha",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Boots",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Angel",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Princess",
  "https://api.dicebear.com/8.x/bottts/svg?seed=Garfield",
]

export const getRandomAvatar = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
}


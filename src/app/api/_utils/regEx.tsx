//   must include at least 5 letters
//   can only contain letters, spaces, and hyphens.
//   must contain at least 5 characters to include a hypen or spaces
//   if name contains a hyphen (-) or space, it cannot be at the start or end.
//   if there are space or hypen they cant be next to each other (either hypen or spaces)

export const pageNameRegex =
  /^(?=(?:[^A-Za-z]*[A-Za-z]){5})(?=.{5,})(?!.*[-]{2,})(?!.*\s{2,})(?!^-)(?!.*-$)(?!.*[-\s]$)(?!^[\s-])[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
